import axios from "axios";

export default class PostService {
    static getALl() {
        return axios.get("https://jsonplaceholder.typicode.com/posts")
                    .then(result => result.data);
    }
}