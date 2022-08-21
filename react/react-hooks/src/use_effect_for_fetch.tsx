import * as React from 'react';
import { useState, useEffect } from 'react';


const myFetch = (url): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({"url": url, "result": {"msg": "success"}});
      }, 1000);
    });
}


const useApi = () => {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        myFetch('http://hoge.example.com/api').then(res => {
            setData(res.result.msg);
        })
    }, []);

    return {data}
}

const FetchViewForEffect = () => {
    const { data } = useApi()
    return (
        <div>{data === null ? 'loading...' : data }</div>
    )
}


export {
    FetchViewForEffect
}
