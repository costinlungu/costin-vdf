const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
const should = chai.should();
const phones = require("../routes/phones");

chai.use(chaiHttp);

function filterByBrands(item, checkedBrands) {
  if (checkedBrands.length > 0) {
    return checkedBrands.includes(item.brand);
  } else {
    return true;
  }
}

describe("Validation", function () {
  it("Check if brands are valid", () => {
    chai
      .request(course)
      .get("/course/1")
      .end((err, res) => {
        expect(res.body.name).to.be.equal("mocha");
        expect(res.body.id).to.be.equal("1");
      });
  });

  it("get courses", () => {
    chai
      .request(course)
      .get("/courses")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.name).to.be.equal("api testing");
      });
  });

  it("get courses with query params", () => {
    chai
      .request(course)
      .get("/course")
      .query({ name: "Guitar course" })
      .end((err, res) => {
        expect(res.body.name).to.be.equal("Guitar course");
      });
  });

  describe("Post OPS", () => {
    chai
      .request(course)
      .post("/course")
      .send({ id: "2", name: "Christmas post" })
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.body.id).to.be.equal("2");
      });
  });
});
