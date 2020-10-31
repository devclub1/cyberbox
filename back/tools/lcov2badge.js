const lcov2badge = require('lcov2badge');
const fs = require('fs');

const generateCoverageShield = () => {
    lcov2badge.badge('./coverage/lcov.info', async (err, badge) => {
        fs.writeFileSync("./tools/coverage.svg", badge.replace(/\n/g, ""));
    });
};

generateCoverageShield();