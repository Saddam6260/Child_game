console.log("start array map ------------------- ");
console.clear();

const objectgetset = {
    name: {
        studentList: [
            { studentName: "Mohd Rejoan", friends: [] },
            { studentName: "Mahfuz Sorker", friends: [] },
            { studentName: "Kamrul Islam", friends: [] },
            { studentName: "Redoy", friends: [] },
            { studentName: "Mehedi Hasan", friends: [] },
        ],
    },

    get setFriendsname() {
          this.name.studentList.map((student, index, selfList) => {
              const friendName = [];
              selfList.map((item, index) => {
                  if (item.studentName !== student.studentName) {
                      friendName.push(item.studentName);
                  }
              });
              student.friends = friendName;
          });

        console.log(this.name.studentList)
    //     console.log("hello");
        // let len = this.name.studentList.length;
        // for (let i = 0; i < len; i++) {
        //     let student = (student[i].studentName);
        //     let friendList = [];

        //     for(let j = 0; j < len; j++) {

        //         if (student[j].studentName !== student) {
        //             friendList.push(student[j]).studentName;
        //         }
        //     }
        //     student[i].friends = friendList;
        // }

        // console.log(this.name.studentList);

    // set setFriendsname(a) {
    //     console.log("hello");
    //     let friendList = [];
    //     for (let index = 0; index < this.name.studentList.length; index++) {
    //         friendList.push(this.name.studentList[index].studentName);
    //     }
    //     console.log(friendList);
        // this.name.studentList[0].friends = rejoan.replace(rejoan, `${friend2}, ${friend3}, ${friend4}`);
        // this.name.studentList[1].friends = rejoan.replace(rejoan, `${friend1}, ${friend3}, ${friend4}`);
        // this.name.studentList[2].friends = rejoan.replace(rejoan, `${friend1}, ${friend2}, ${friend4}`);
        // this.name.studentList[3].friends = rejoan.replace(rejoan, `${friend1}, ${friend2}, ${friend3}`);
    },
};

// objectgetset.setFriendsname = "Mohd Rejoan";
// console.log(objectgetset.name);
objectgetset.setFriendsname;


// const person = {
//     name : "Saddam",
//     roll : 01,

//     set changesetRoll(n) {
//         this.roll = n+5;
//     }
// };

// person.changesetRoll = 01;
// console.log(person);

// const rejoan = {
//     name : "rejoan",
//     roll : 01,

//     get changegetName() {
//         return this.name = "Saddam";
//     }
// };

// console.log(rejoan.changegetName);
