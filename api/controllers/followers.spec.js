const mockAxios = require("axios");
const followersController = require("./followers");

describe("Followers Controller",()=>{
    beforeEach(()=>{
        mockAxios.get.mockReset()
    })
    test("getUserFollowers - should change the response of response object based on request object", async () => {
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:{
                randomName:{}
            }
        }))
        const req = {
            params: {
                userId:"test1"
            }
        };
        res = {
            send: jest.fn(()=>{}),
            json: jest.fn((obj)=>{res.body = obj}),
            status: jest.fn(function(status) {
                res.responseStatus = status;
                return this; 
            }),
            body:null,
            responseStatus:null
        }
        await followersController.getUserFollowers(req,res);
        expect(res.responseStatus).toEqual(200);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("https://api.github.com/users/test1/followers?per_page=5")
        expect(res.body.followers).toEqual({});
    }),
    test("setNestedValue - should set the nested value of an object given an array or dot separated string",() => {
        let prop = {
            A:{
                A:{
                    val:null
                },
                B:{
                    val:null
                },
                C:{
                    val:null
                }
            },
            B:{
                A:{
                    val:null
                },
                B:{
                    val:null
                },
                C:{
                    val:null
                }
            },
            C:{
                A:{
                    val:null
                },
                B:{
                    val:null
                },
                C:{
                    val:null
                }
            }
        }
        followersController.setNestedValue(["A","A","val"],"MUTATION1",prop);
        expect(prop.A.A.val).toEqual("MUTATION1");
        expect(prop.A.B.val).toEqual(null);
    })
    test("cleanDataForUserIds - from a list of objects should only return an object of login ids",()=>{
        let list = [
            {
                "login": "fakeLogin1",
                "id": 2000001,
                "node_id": "MDQ6VXNlcjcwODI2MDM=",
                "avatar_url": "fake",
                "gravatar_id": "",
                "url": "fake",
                "html_url": "fake",
                "followers_url": "fake",
                "following_url": "fake",
                "gists_url": "fake",
                "starred_url": "fake",
                "subscriptions_url": "fake",
                "organizations_url": "fake",
                "repos_url": "fake",
                "events_url": "fake",
                "received_events_url": "fake",
                "type": "User",
                "site_admin": false
            },
            {
                "login": "fakeLogin2",
                "id": 2000001,
                "node_id": "MDQ6VXNlcjcwODI2MDM=",
                "avatar_url": "fake",
                "gravatar_id": "",
                "url": "fake",
                "html_url": "fake",
                "followers_url": "fake",
                "following_url": "fake",
                "gists_url": "fake",
                "starred_url": "fake",
                "subscriptions_url": "fake",
                "organizations_url": "fake",
                "repos_url": "fake",
                "events_url": "fake",
                "received_events_url": "fake",
                "type": "User",
                "site_admin": false
            },
            {
                "login": "fakeLogin3",
                "id": 2000001,
                "node_id": "MDQ6VXNlcjcwODI2MDM=",
                "avatar_url": "fake",
                "gravatar_id": "",
                "url": "fake",
                "html_url": "fake",
                "followers_url": "fake",
                "following_url": "fake",
                "gists_url": "fake",
                "starred_url": "fake",
                "subscriptions_url": "fake",
                "organizations_url": "fake",
                "repos_url": "fake",
                "events_url": "fake",
                "received_events_url": "fake",
                "type": "User",
                "site_admin": false
            }
        ]
        let result = followersController.cleanDataForUserIds(list);
        expect(result).toEqual({"fakeLogin1": {}, "fakeLogin2": {}, "fakeLogin3": {}})
    })
    test("fetchUserIds - should return an object with keys to other objects", async () => {
        let fake_list = [
            {
                "login":"test1"
            },
            {
                "login":"test2"
            },
            {
                "login":"test3"
            }
        ]
        mockAxios.get.mockImplementation(() => Promise.resolve({
            data: fake_list
        }))
        let test1 = await followersController.fetchUserIds("testing",{},2);
        expect(mockAxios.get).toHaveBeenCalledTimes(13)
        mockAxios.get.mockReset()
    })
})