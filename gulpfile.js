var gulp = require('gulp');
var glop = require('glob');
var fs = require('fs');
var path = require('path');

var assetPath = './server/public';

var getPrimitiveValue = function (obj, ret) {
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue

    var val = obj[key]
    if (typeof val === 'object') getPrimitiveValue(val, ret)
    else ret.push(val)
  }

  return ret;
}


gulp.task('clean', function(done){
    (['assets-client.json']).forEach(function(manifestFile){
        try{
            var content = fs.readFileSync(path.join(assetPath, manifestFile));
            var maniFest = JSON.parse(content);
            getPrimitiveValue(maniFest, []).forEach(function (name) {
                fs.unlinkSync(path.join(assetPath, name))
            })
        }catch(e){

        }
    })

    glop(assetPath+ '/*', function(err, files){
        // if(err){
        //     console.log("err", err);
        // }else{
        //     console.log(files);
        // }
    })

    done();
})