module.exports = {
  env: {
      "BASE_URL": "https://ecommerceanhlpt.herokuapp.com",
      // connect cloud mogodb
      "MONGODB_URL": "mongodb+srv://anh:anh@cluster0.pzq4wws.mongodb.net/next_ecommerce?retryWrites=true&w=majority",
      // https://www.passwordsgenerators.net/ config access token với Password Length: 50 là char
      "ACCESS_TOKEN_SECRET": "hCma3RhMFbMgJ9FUN4]z$q`-}b?Mq>Ed2KU#F'(QR.w^*5q`<D",
      // https://www.passwordsgenerators.net/ config access token với Password Length: 80 là char
      "REFRESH_TOKEN_SECRET": "c4BNF[({`cP;g6%&9>.&::[!mA(V2Z6_dtgDss']u%Cj~M?#_,/}/A7%J8FJzsm&9k9Z!';k*~*^wJ",
      // link app test paypal https://developer.paypal.com/dashboard/applications/edit/SB:QVpnVy0yalhWOGFCdEZRMUpnX05jRVo0QVhDMDRhdUFjcE5FOWVoUDBaQ2xKenZuRTVfekhLbjhiTVFFUDVpM2Y4TFZMSWFFVlhPQlBoTFI=
      // account payment anhroyal110 Anh202000 / 0962731018
      "PAYPAL_CLIENT_ID": "AZgW-2jXV8aBtFQ1Jg_NcEZ4AXC04auAcpNE9ehP0ZClJzvnE5_zHKn8bMQEP5i3f8LVLIaEVXOBPhLR",
      "CLOUD_UPDATE_PRESET": "cloudfilesAnhLPT",
      "CLOUD_NAME": "anhlptstore",
      "CLOUD_API": "https://api.cloudinary.com/v1_1/anhlptstore/image/upload/"
  }
}