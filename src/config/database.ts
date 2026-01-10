import mongoose from 'mongoose'
export const connectDB=async():Promise<void>=>{
    try{
       const mongoURI=process.env['MONGODB_URI'];
       if(!mongoURI){
        throw new Error(
            "MONGODB_URL is not defined in the environmental variables"
        );
       }
       await mongoose.connect(mongoURI);

       process.on("SIGINT",async()=>{    //handle ctrl+c shutdown
        await mongoose.connection.close();  
        process.exit(0);
       })
    }catch(error){
       throw new Error(
       ` failed to connect to mongodb ${error}`
       )
    }
};
    export const disconnectDB=async():Promise<void>=>{
        try{
            await mongoose.connection.close();
        }catch(error){}
    };
    
