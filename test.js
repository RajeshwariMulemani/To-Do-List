(function re(str){

    let space=0;
    let arr=[]
   
    for(let i=0; i<str.length;i++){
    
       
                console.log(str.charAt(i))
                arr.push(str.charAt(i) )
    
            
    
    }
    
    console.log(arr)
    
    let newStr=""
    
    for( let i=0;i<arr.length; i++){
    
        
        if(arr[i] == " "){
    
            for(j=i-1;j>=space;j--){
    
                    newStr = newStr + arr[j]
                
                }
                newStr = newStr + " "
                space = i+1
          }
    
     if( i  == arr.length-1){
    
        
            for(let j=arr.length -1;j>=space;j--){
                console.log("newStr",arr[j])
                    newStr = newStr + arr[j]
                
                }
                newStr = newStr + " "
               
          }
    
    
    }

    console.log(newStr)
    
    return newStr
    
    })("Hi My Name is Pintu")