# tour-and-travel-server
User
Tour
Review

user{
    name
    email
    age
    photo
    role>user ,admin
    status > active,inactive
}

tour{
    name
    duration
    rating
    price
    coverImg
    img[]
    startDate
    tourLocation

}

review{
    review
    rating
    tour->ref
    user -> ref
}


# issue
- transition and roll back e jkn kono error pai tkn booking tikh e create hoi na but update ta hoyea jai 
- static method issue 
