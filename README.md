# Coding Assignment

This quiz is based on spaced repetition learning method. Newer and harder questions appear more frequetly and
older and easier questions appear less frequently.

# Installation & Usage

    (Must have node.js installed on the machine)
    1. Clone the repository and change directory to repository folder
    1. npm install
    2. npm start

# Config.json (located in src folder)

Admin specified. Admin has the ability to configure

- number of boxes: total number of boxes you want to have to put questions into.
- total quiz time: time allowed for the entire quiz.
- time for box with hardest question: time assigned to box 0 (the box with hardest questions).
- time decrement: Time you want to decrease for next box after box 0.

Note: Number of boxes should be less than total number of questions to be shown so that each
box has atleast a question initially.
