const fs = require('fs')
const path = require('path') 
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      'html',
      'css',
      'js',
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };
  
function organizeFn(dirpath){
    //Input of a directory Path
    let destpath
    if(dirpath==undefined){
        //check whether dirpath is passed or not
        console.log("Please enter a valid path");
        return;
    }

    else{
        //This will tell whether the dirpath exists or not
        let doesExist = fs.existsSync(dirpath);
        
//dirpath -- > //C:\Users\boina\Desktop\file system organisation\test folder
        if(doesExist == true){
            destpath = path.join(dirpath,'organized_files');

            if(fs.existsSync(destpath)==false){
                fs.mkdirSync(destpath) // we will only create a folder if it does not already exists
            }else{
                console.log('This folder already exists')
            }

        }else{
            console.log("Please enter a valid path");
        }
    }
    organizeHelper(dirpath , destpath);
}

// we are writting this function to categorize our files
function organizeHelper(src,dest){
    let childName = fs.readdirSync(src)//get all the files and folders inside ur source
    // console.log(childName)

    for(let i=0;i<childName.length;i++){
        let childAddress= path.join(src,childName[i]);//path is identified for the files
        let isFile = fs.lstatSync(childAddress).isFile()// we check here to identify only the files
        //console.log(childAddress+" "+isFile);

        if(isFile == true){
            let fileCategory = getCategory(childName[i])
            console.log(childName[i]+" Belongs to "+fileCategory)
            sendFiles(childAddress,dest,fileCategory)
        }
    }
}


function getCategory(name){
    let ext = path.extname(name);
    ext  = ext.slice(1)
    //console.log(ext)

    for(let type in types){
        let cTypeArr = types[type]
        //console.log(cTypeArr)
        for(let i=0;i<cTypeArr.length;i++){
            if(ext == cTypeArr[i]){
            return type
            }
        }
    }
    return 'others'
}

function sendFiles(srcFilePath , dest,fileCategory){
    let catPath = path.join(dest,fileCategory)

    if(fs.existsSync(catPath) == false){
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath)//we took ou the names of the files
    let destFilePath = path.join(catPath,fileName)//here we created a path for the files in category folders

    fs.copyFileSync(srcFilePath,destFilePath)// copied files from src to dest

    fs.unlinkSync(srcFilePath)//deleted the files from src
    console.log(fileName+" is copied to "+fileCategory)
}
module.exports={
    organizeKey : organizeFn
}