export default async(req, res) => {
    res.status(200).json({
        message: "welcome to the chunkysoap api",
        version: "1.0",
        author: 'rob@webnostix.co.uk'
    })
}