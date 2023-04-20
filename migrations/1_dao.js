const Migrations = artifacts.require("DAO");

module.exports = function (deployer) {

  deployer.deploy(Migrations,"720000","760000","51");
};