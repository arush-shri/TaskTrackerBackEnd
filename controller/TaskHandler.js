const { database } = require('./DBConnector');

async function createTask(email, taskName, deadline, description, status){
    const receivedDeadline = new Date(deadline);
    const year = receivedDeadline.getUTCFullYear();
    const month = receivedDeadline.getUTCMonth() + 1;
    const day = receivedDeadline.getUTCDate();
    const hours = receivedDeadline.getUTCHours();
    const minutes = receivedDeadline.getUTCMinutes();
    const seconds = receivedDeadline.getUTCSeconds();

    const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const tasksDB = database.collection("tasks");
    const filter = { "emailId": email };
    const taskQuery = {
        "taskname": taskName,
        "date": date,
        "time": time,
        "description": description,
        "status": status                       //PRIORITY BHI ADD KRNA HAI
    };
    const result = await tasksDB.updateOne(filter, {$push: {"tasks" : taskQuery}});

    if(result.modifiedCount === 1){
        return true;
    }
    else{
         ;
        return result;
    }
}

async function editTask(email, taskName, Oldtaskname, Olddeadline, Newdeadline , description, status){
    const receivedDeadline = new Date(Olddeadline);
    const year = receivedDeadline.getUTCFullYear();
    const month = receivedDeadline.getUTCMonth() + 1;
    const day = receivedDeadline.getUTCDate();
    const hours = receivedDeadline.getUTCHours();
    const minutes = receivedDeadline.getUTCMinutes();
    const seconds = receivedDeadline.getUTCSeconds();

    const olddate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const oldtime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    console.log(`dead ${Olddeadline}`)
    console.log(`name ${taskName}`)
    console.log(`date ${olddate}`)
    console.log(`time ${oldtime}`)
    const filter = { "emailId": email };
    const tasksDB = database.collection("tasks");
    const result =  await tasksDB.updateOne(filter, {$pull: {"tasks":{"taskname": Oldtaskname, "date": olddate, "time": oldtime}}});
    console.log(result)
    const updateResult = await createTask(email, taskName, Newdeadline, description, status);
    if(result && updateResult){
        return true;
    }
    else{
        return "Unable to update task"
    }
}

async function deleteTask(email, taskName, date, time){

    console.log(`name ${taskName}`)
    console.log(`time ${time}`)
    console.log(`date ${date}`)
    const filter = { "emailId": email };
    const tasksDB = database.collection("tasks");
    const result =  await tasksDB.updateOne(filter, {$pull: {"tasks":{"taskname": taskName, "date": date, "time": time}}});
    console.log(result)
    if(result){
        return true;
    }
    else{
        return "Unable to update task";
    }
}

async function getTask(email, taskName, deadline) {
    const filter = {"emailId": email, "taskname": taskName};
    const tasksDB = database.collection("tasks");
    
    try {
        const result = await tasksDB.findOne(filter);

        if (result) {
            return result;
        } else {
            return "Task not found";
        }
    } catch (error) {
        console.error("Error fetching task:", error);
        return "Error fetching task";
    }
}

async function getAllTasks(email) {
    const filter = { "emailId": email };
    const taskDB = database.collection("tasks");
    
    try {
        const result = await taskDB.findOne(filter)
        if (result.tasks.length > 0) {
            return result.tasks;
        } else {
            return "No tasks found for the user";
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return "Error fetching tasks";
    }
}


module.exports = { createTask, editTask, deleteTask, getTask, getAllTasks }