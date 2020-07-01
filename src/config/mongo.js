export default {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  passwd: process.env.PASSWD,
  dbname: process.env.DBNAME,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
}