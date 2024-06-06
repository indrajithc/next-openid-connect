import { NextResponse } from "next/server"

const handler = ( request)=> {
  console.log({w : request})
return  NextResponse.json({
    "sub": "248289761001",
    "name": "Jane Josephine Doe",
    "given_name": "Jane",
    "family_name": "Doe",
    "middle_name": "Josephine",
    "nickname": "JJ",
    "preferred_username": "j.doe",
    "profile": "http://exampleco.com/janedoe",
    "picture": "http://exampleco.com/janedoe/me.jpg",
    "website": "http://exampleco.com",
    "email": "janedoe@exampleco.com",
    "email_verified": true,
    "gender": "female",
    "birthdate": "1972-03-31",
    "zoneinfo": "America/Los_Angeles",
    "locale": "en-US",
    "phone_number": "+1 (111) 222-3434",
    "phone_number_verified": false,
    "address": {
      "country": "us"
    },
    "updated_at": "1556845729"
  })

}

export { handler as GET, handler as POST };