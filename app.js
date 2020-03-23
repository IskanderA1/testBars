let crudApp = new function () {
    this.lpu = [
        { ID: '1', full_name: 'РКБ', address: 'Ул. Петрушкина', phone: 1244112 },
        { ID: '2', full_name: 'Инвекционак №4', address: 'Ул. Пушкина', phone: 546241 },
        { ID: '3', full_name: 'Городская Больница №6', address: 'Ул. Колотушкина', phone: 124213 }
    ]

    this.col = [];

    this.createTable = function () {
        let i;
        for (i = 0; i < this.lpu.length; i++) {
            for (let key in this.lpu[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        let table = document.createElement('table');
        table.setAttribute('id', 'clinicTable');

        let tr = table.insertRow(-1);

        for (let h = 0; h < this.col.length; h++) {
            let th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        for (let i = 0; i < this.lpu.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < this.col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.lpu[i][this.col[j]];
            }


            this.td = document.createElement('td');

            // *** CANCEL OPTION.
            tr.appendChild(this.td);
            let lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);

            // *** SAVE.
            tr.appendChild(this.td);
            let btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            let btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            let btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }



        tr = table.insertRow(-1);

        for (let j = 0; j < this.col.length; j++) {
            let newCell = tr.insertCell(-1);
            if (j >= 1) {
                let tBox = document.createElement('input');
                tBox.setAttribute('type', 'text');
                tBox.setAttribute('value', '');
                newCell.appendChild(tBox);
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        let btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');
        this.td.appendChild(btNew);

        let div = document.getElementById('container');
        div.innerHTML = '';
        div.appendChild(table);

    };

    // ****** OPERATIONS START.

    // CANCEL.
    this.Cancel = function (oButton) {

        oButton.setAttribute('style', 'display:none; float:none;');

        let activeRow = oButton.parentNode.parentNode.rowIndex;


        let btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        let btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        let tab = document.getElementById('clinicTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            let td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.lpu[(activeRow - 1)][this.col[i]];
        }
    }



    this.Update = function (oButton) {
        let activeRow = oButton.parentNode.parentNode.rowIndex;
        let tab = document.getElementById('clinicTable').rows[activeRow];

        // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        for (let i = 1; i < 4; i++) {
            let td = tab.getElementsByTagName("td")[i];
            let ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', td.innerText);
            td.innerText = '';
            td.appendChild(ele);

        }

        let lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        let btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        oButton.setAttribute('style', 'display:none;');
    };



    this.Delete = function (oButton) {
        let activeRow = oButton.parentNode.parentNode.rowIndex;
        this.lpu.splice((activeRow - 1), 1);
        this.createTable();
    };


    this.Save = function (oButton) {
        let activeRow = oButton.parentNode.parentNode.rowIndex;
        let tab = document.getElementById('clinicTable').rows[activeRow];


        for (let i = 1; i < this.col.length; i++) {
            let td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text') {
                this.lpu[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;
            }
        }
        this.createTable();
    }


    this.CreateNew = function (oButton) {
        let activeRow = oButton.parentNode.parentNode.rowIndex;
        let tab = document.getElementById('clinicTable').rows[activeRow];
        let obj = {};

        for (i = 1; i < this.col.length; i++) {
            let td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text') {
                let txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('Введите значения');
                    break;
                }
            }
        }
        obj[this.col[0]] = this.lpu.length + 1;

        if (Object.keys(obj).length > 0) {
            this.lpu.push(obj);
            this.createTable();
        }
    }
}

crudApp.createTable();