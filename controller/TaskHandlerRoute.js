const expres = require("express");
const { createTask, editTask, deleteTask, getTask, getAllTasks } = require("./TaskHandler")
const taskRoute = expres.Router();

taskRoute.post('/createTask', async (req, res)=>{
    console.log(req.body.deadline)
    const result = await createTask(req.body.email, req.body.taskname, req.body.deadline, req.body.description, req.body.status)
    if(result){
        res.status(200).send("Task created successfully");
    }
    else{
        res.status(500).send("Failed to create task");
    }
}) 
                                                     //PRIORITY BHI ADD KRNA HAI
taskRoute.post('/updateTask/:email', async (req, res)=>{
    console.log(req.body)
    const result = await editTask(req.params.email, req.body.taskname, req.body.Oldtaskname, req.body.Olddeadline, req.body.Newdeadline, req.body.description, req.body.status)
    if(result){
        res.status(200).send("Task update successfully");
    }
})

taskRoute.post('/deleteTask/:email', (req, res)=>{

    const result = deleteTask(req.params.email, req.body.taskname, req.body.date, req.body.time)
    if(result){
        res.status(200).send("Task delete successfully");
    }
    else{
        res.status(500).send("Failed to delete task");
    }
})

taskRoute.get('/getTask/:email', async (req, res) => {
    try {
        const result = await getTask(req.params.email, req.query.taskname);

        if (result) {
            res.status(200).send("Task found successfully");
        } else {
            res.status(404).send("Failed to find task");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

taskRoute.get('/getAllTasks/:email', async (req, res) => {
    const email = req.params.email;
    console.log(email)

    try {
        const tasks = await getAllTasks(email);

        if (tasks.length > 0) {
            res.status(200).json({ tasks });
        } else {
            res.status(404).json({ message: "No tasks found for the user" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = taskRoute