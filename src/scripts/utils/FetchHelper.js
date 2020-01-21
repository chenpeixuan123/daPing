/**
 * Created by wind on 2017/3/9.
 */

class FetchHelper{
    static checkStatus(response){
        if(response.status >= 200 && response.status< 300){
            return response;
        }else{
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
    static parseJSON(response){
        return response.json();
    }
    static fetchDataFailed(error){
        //console.error('FetchHelper fetch data failed.', error);
        return error;
    }
    static parseData(obj){
        if(obj.isError === false){
            return obj.data;
        }else{
            var error = new Error('数据内容错误');
            error.obj = obj;
            throw error;
        }
    }
    static parseData2(obj){
      if(obj.result === true){
          return obj.data;
      }else{
          var error = new Error('数据内容错误');
          error.obj = obj;
          throw error;
      }
  }
}

export default FetchHelper;