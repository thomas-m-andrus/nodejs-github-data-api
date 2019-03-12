
const request = require("supertest")
const app = require("./../../app");
const mockAxios = require("axios");
const baseURL = "/followers";


describe("GET /followers",()=>{
  test("/test1 - should return an empty array", async ()=>{
    let fake_list = [
        
    ]
    mockAxios.get.mockImplementation(()=>Promise.resolve({
        data: fake_list
    }))
    const response = await request(app).get(baseURL+"/test1");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(response.body).toHaveProperty("followers");
    expect(response.body.followers).toEqual({});
    expect(response.statusCode).toBe(200);
  })
  test("/test2 - should return a specified array", async () => {
    let fake_list = [
        {
            "login":"individual1"
        },
        {
            "login":"individual2"
        },
        {
            "login":"individual3"
        }
    ]
    mockAxios.get.mockImplementation(()=>Promise.resolve({
        data: fake_list
    }))
    const response = await request(app).get(baseURL+"/test2");
    expect(response.body).toHaveProperty("followers");
    expect(mockAxios.get).toHaveBeenCalledTimes(5);
    expect(response.body.followers).toEqual({"individual1": {"individual1": {}, "individual2": {}, "individual3": {}}, "individual2": {"individual1": {}, "individual2": {}, "individual3": {}}, "individual3": {"individual1": {}, "individual2": {}, "individual3": {}}});
    expect(response.statusCode).toBe(200);
    })
})