let users = [{
        firstname: "Helmy",
        lastname: "Lobo",

    },
    {
        firstname: "James",
        lastname: "Dubo",
    },
    {
        firstname: "Devin",
        lastname: "Bobo",
    }
];


let
    db,
    db_request,
    db_name='Admin',
    db_version = 1,
    db_transaction,
    db_objectStore;

db_reqest = indexedDB.open(db_name, db_version);
db_reqest.onerror = (event) => {
    alert('Failed to open IndexedDB');
}
db_reqest.onsuccess = (event) => {
    console.log('onsuccess');
    db = event.target.result;
    db_transaction = db.transaction(['users-table'], 'readwrite');
    db_objectStore = db_transaction.objectStore('users-table');
    //增添数据
    users.forEach((user) => db_objectStore.add(user));
    //通过主键查询数据
    const getByKey = db_objectStore.get(1);
    getByKey.onerror = (event) => {
        console.log('Failed to get data with primary key')
    };
    getByKey.onsuccess = (event) => {
        if (getByKey.result) {
            console.log('get data with Key by get()');
            console.log('firstname:' + getByKey.result.firstname);
            console.log('lastname:' + getByKey.result.lastname);
        } else {
            console.log('get nothting with key by get()')
        }
    }
    //通过索引遍历数据查找对应主键
    const index = db_objectStore.index('lastname');
    const getByIndex = index.get('Lobo');
    getByIndex.onsuccess = (event) => {
        if (event.target.result) {
            console.log('get data by Index');
            console.log('Lobo\'s id is ' + event.target.result.id);
        }
    }
    //通过游标遍历数据
    db_objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            console.log('traverse data with cursor.')
            console.log('id:' + cursor.key);
            console.log('firstname:' + cursor.value.firstname);
            console.log('lastname:' + cursor.value.lastname);
            cursor.continue();
        } else {
            console.log('that\'s all');
        }
    }
    //通过IDBObject.put()方法和主键更新数据
    const updateByPut = db_objectStore.put({ id:1,firstname: 'hello', lastname: 'kitkit' });
    updateByPut.onsuccess = (event) => {
        console.log('Succeed to update data with key by put()');
    }
    updateByPut.onerror=(event)=>{
        console.log('Failed to update');
    }
    //通过IDBObjectStore.delete()和主键删除数据
    const deleteReq = db_objectStore.delete(1);
    deleteReq.onsuccess = (event) => {
        console.log('Succeed to delete data with key by delete()')
    }
}
db_reqest.onupgradeneeded = (event) => {
    console.log('onupgradeneeded');
    db = event.target.result;
    if (!db.objectStoreNames.contains('users-table')) {
        db_objectStore = db.createObjectStore('users-table', { //ObjectStore数据表,只能在onupgradeneeded创建（存储空间名称，存储对象的属性）
            keyPath: "id",
            autoIncrement: true
        });
        db_objectStore.createIndex('firstname', 'firstname', { //Indext相当于一列，（索引，指定构建索引的存储数据的属性，配置对象）
            unique: false
        })
        db_objectStore.createIndex('lastname', 'lastname', { //Indext相当于一列，（索引，指定构建索引的存储数据的属性，配置对象）
            unique: true
        })
        console.log('ObjectStore users-table created');
    }
}

console.log('start');