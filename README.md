# Taskgarden

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## General Approach

1. Design

The overall theme of the application is focus and simplicity. 

We want users to have clarity over their daily tasks in a non-cluttered environment with simple no-nonsense classification of importance and urgency

At the same time, we want to motivate users to carry out tasks. Although completing tasks are rewards in their own right, we want to allow the user to visualise the mountains of work they actually accomplish so they don't lose sight of how awesome they are.

We achieve this by allowing users to tie tasks to plants in their garden, and every time they complete their tasks, that plant will grow.

However, we also want to encourage getting out of the comfort zone and usual humdrum and decided to give the user the option of performing a daily task. 

These daily tasks are meant to be simple to complete and earns them coins which they can use to buy plants at the florist.

Do Dailies > Buy Plants > Add Tasks > Do Tasks > Grow Plants > Repeat

Simple.

2. Ownership

This is app is just as much about work prioritisation as it is about personal growth. 

Inculcating good habits and visualising their accumulated efforts over the years requires us to allow users to create accounts that save their tasks and progress.

3. Security

To ensure security for the app, every route (page/action) is checked for the proper authentication using jwt.

4. Responsiveness

As this is a relative lightweight app, and we wanted to allow the logging of tasks on-the-go (so that the user doesn't forget to add it later), the pages are designed to work on smaller screen sizes as well.

## Front End

The app consists of the following pages:

### Login


### Dashboard

![Image od Dashbord](https://git.generalassemb.ly/zhiyang/taskgarden-front/blob/master/src/assets/img/dashboard-w-instructions.png)

1a. Every day, dailies will be generated for your to accomplish. 

1b. Click on the "Not Done" Button to turn it to done, and earn coins!

2. Press this Button to open the "Add new task button"

3. New Tasks will turn up depending on which classfication you selected on the "Add new task button"

4. Click on the check box to mark the start as done! Uncheck, in case you checked it wrongly

5. Click on the red x Button to delete the task (Note: these are cleared permanently)

6. Once you are calling it a day, press the Archive Done Tasks to archive all tasks you have marked as Done


### Florist


### Garden

