const {
    override,
    useBabelRc
} = require("customize-cra");

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc()
);

//cấu hình webpack ghi đè babel sử dụng file .babelrc để biên dịch code jsx