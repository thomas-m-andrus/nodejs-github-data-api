const axios = require("axios");

const followerFunctions = {
    async getFollowerFromGitHub(id){
        try {
            let url = "https://api.github.com/users/"+id+"/followers?per_page=5";
            const response = await axios.get(url);
            return response;
        } catch (error){
            console.log(error);
        }
    },
    async getUserFollowers(req,res){
        const id = req.params.userId;
        let followers = [];
        followers = await followerFunctions.fetchUserIds(id,{},1);
        res.status(200).json({
            followers: followers
        })
    },
    cleanDataForUserIds(usersList){
        let len = usersList.length;
        let result = {};
        for(var i = 0; i < len; i++){
            let obj = usersList[i];
            result[obj.login] = {}
        }
        return result;
    },
    setNestedValue(path,value,obj){
        let properties = Array.isArray(path) ? path : path.split(".")
        if (properties.length > 1) {
            if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== "object") obj[properties[0]] = {}
            return followerFunctions.setNestedValue(properties.slice(1), value, obj[properties[0]])
        } else {
            obj[properties[0]] = value
            return true
        }
    },
    async fetchUserIds(id,results,depth,key = []){
        let res = await followerFunctions.getFollowerFromGitHub(id);
        let ids = followerFunctions.cleanDataForUserIds(res.data);
        if(key.length > 0){
            followerFunctions.setNestedValue(key,ids,results);
        } else {
            results = ids;
        }
        if(depth>0){
            let keys = Object.keys(ids);
            let len = keys.length;
            if(len>0){
                let nextKey = null;
                for(let i = 0; i < len; i++){
                    nextKey = key.concat([keys[i]]);
                    results = await followerFunctions.fetchUserIds(keys[i],results,depth-1,nextKey);
                }
            }
        }
        return results
    }
}
module.exports = followerFunctions;