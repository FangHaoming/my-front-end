let users = {
    username: "007",
    firstName: "James",
    lastName: "Bond",
    password: "foo"
};


let
    db,
    db_request,
    db_version = 1,
    db_transaction,
    db_objectStore;
db_reqest = indexedDB.open('admin', 1);
db_reqest.onerror = (event) => {
    alert(`Failed to open:${event.target.errorCode} `)
}
db_reqest.onsuccess = (event) => {
    db = event.target.result;
}
db_reqest.onupgradeneeded = (event) => {
    db = event.target.result;
    if(!db.objectStoreNames.contains('person')){
        db_objectStore=db.createObjectStore('users', {
            keyPath: "username"
        });
        db_objectStore.createIndex
    }
    
}

db_transaction=db.transaction("users","readwrite");

