import firebase from "../firebase";

class Service {
  async addData(sendData, collectionName, idName) {
    console.log(sendData);
    const db = firebase.firestore();

    const res = await db
      .collection(collectionName)
      .add(sendData)
      .then(async (docRef) => {
        console.log("Document written with ID: ", docRef.id);
        await db
          .collection(collectionName)
          .doc(docRef.id)
          .update({
            [idName]: docRef.id,
          })
          .then(() => {
            console.log("Data hass been added successfully");
          })
          .catch((error) => {
            console.error("Error during updateing document id: ", error);
          });
        return "success";
      })
      .catch((error) => {
        console.error("Error during adding document: ", error);
        return "error";
      });
    return res;
  }
  async addDataAndReturnId(sendData, collectionName, idName) {
    const db = firebase.firestore();

    const res = await db
      .collection(collectionName)
      .add(sendData)
      .then(async (docRef) => {
        console.log("Document written with ID: ", docRef.id);
        await db
          .collection(collectionName)
          .doc(docRef.id)
          .update({
            [idName]: docRef.id,
          })
          .then(() => {
            console.log("Data hass been added successfully");
          })
          .catch((error) => {
            console.error("Error during updateing document id: ", error);
          });
        return docRef.id;
      })
      .catch((error) => {
        console.error("Error during adding document: ", error);
        return "error";
      });
    return res;
  }
  async deleteData(collectionName, docID) {
    const db = firebase.firestore();
    const res = await db
      .collection(collectionName)
      .doc(docID)
      .delete()
      .then(() => {
        console.log("Document successfully deleted");
        return "success";
      })
      .catch((error) => {
        console.error("Error during removing document: ", error);
        return "error";
      });
    return res;
  }
  async updateData(sendData, collectionName, docID) {
    const db = firebase.firestore();

    const res = await db
      .collection(collectionName)
      .doc(docID)
      .update(sendData)
      .then(() => {
        console.log("Document Updated: ");
        return "success";
      })
      .catch((error) => {
        console.error("Error during update document: ", error);
        return "error";
      });
    return res;
  }
  async uploadImage(image) {
    const storage = firebase.storage();
    await storage.ref(`images/${image.name}`).put(image);

    const url = await storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then((url) => {
        return url;
      });

    return url;
  }
  async getData(collectionName, limit) {
    const db = firebase.firestore();
    const fetchedDataList = await db
      .collection(collectionName)
      .orderBy("timeStamp", "desc")
      .limit(limit)
      .get()
      .then((snapshot) => {
        let fetchedDataList = [];

        snapshot.docs.forEach((doc) => {
          fetchedDataList.push(doc.data());
        });
        console.log("Data fetched ");

        return fetchedDataList;
      })
      .catch((e) => {
        const fetchedDataList = [];
        console.log("Error during fetching data" + e);
        return fetchedDataList;
      });
    return fetchedDataList;
  }
  async getDataWithoutLimit(collectionName, docID) {
    const db = firebase.firestore();
    const fetchedDataList = await db
      .collection(collectionName)
      .doc(docID)
      .get()
      .then((doc) => {
        console.log("Data fetched ");

        return doc.data();
      })
      .catch((e) => {
        console.log("Error during fetching data" + e);
        return "error";
      });
    return fetchedDataList;
  }
  async getEmployeeList(collectionName) {
    const db = firebase.firestore();
    const fetchedDataList = await db
      .collection(collectionName)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        console.log(collectionName);
        const fetchedDataList = [];

        snapshot.docs.forEach((doc) => {
          fetchedDataList.push({
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            doctorid: doc.data().doctorid,
          });
        });
        console.log(fetchedDataList);
        return fetchedDataList;
      })
      .catch((e) => {
        console.log("Error during fetching data" + e);
        return "error";
      });
    return fetchedDataList;
  }
  async getDocCount() {
    let getAllDocCount = {
      patients: 0,
      doctors: 0,
      nurses: 0,
      pharmacists: 0,
      laboratorist: 0,
      accountant: 0,
      receptionist: 0,
      operationreport: 0,
      birthreport: 0,
      deathreport: 0,
      payrolllist: 0,
    };
    const allCollectionName = [
      "patients",
      "birthreport",
      "accountant",
      "deathreport",
      "doctors",
      "laboratorist",
      "nurses",
      "operationreport",
      "payrolllist",
      "pharmacists",
      "receptionist",
    ];
    const db = firebase.firestore();
    await Promise.all(
      allCollectionName.map(async (p) => {
        await db
          .collection(p)
          .get()
          .then((snapshot) => {
            getAllDocCount = {
              ...getAllDocCount,
              [p]: snapshot.docs.length,
            };
          })
          .catch((e) => {
            console.log("Error during fetching doc count" + e);
          });
      })
    );

    return getAllDocCount;
  }
  async getSearchRes(collectionName, searchText) {
    const db = firebase.firestore();
    const res = db
      .collection(collectionName)
      .orderBy("searchbyname")
      .startAt(searchText)
      .endAt(searchText + "\uf8ff")
      .get()
      .then((snapshot) => {
        const resultPatientlist = [];

        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          resultPatientlist.push(doc.data());
        });
        return resultPatientlist;
      })
      .catch((e) => {
        console.log("Error dunring searching in firebase" + e);
        return "error";
      });
    return res;
  }
  async getTotalNumOfPerson(collectionName) {
    const db = firebase.firestore();
    const res = db
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        return snapshot.docs.length;
      })
      .catch((e) => {
        console.log("Error during getTotalNumOfPerson" + e);
        return "error";
      });
    return res;
  }
}

export default new Service();
