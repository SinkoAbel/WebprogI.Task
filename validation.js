
const makeItValid = function (){

    const myForm = document.getElementById("myForm");

    myForm.addEventListener("submit", function (e){
        e.preventDefault();

        const clientName = document.getElementById('name').value;
        const gender = document.getElementById('identity').value;

        const taxNo = document.getElementById('tax').value;
        const error_msg1 = document.getElementById('error_tax');

        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        const birth = document.getElementById('datepicker').value;

        const tajNo = document.getElementById('taj_szam').value;
        const error_msg2 = document.getElementById('error_taj');

        const highestEducation = document.getElementById('education').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;



        // ################### TAJ-szám ellenőrzése ###################
        const regex = /(\d)\s+(?=\d)/g;
        const subst = `$1`;
        const result = tajNo.replace(regex, subst);
        const tajArr = Array.from(String(result), Number);

        let even = 0;
        let odd = 0;

        for (let i = 0; i < result.length-1; i++)
        {
            if (i % 2 === 0) // ő lesz a páratlan mert 0-tól indulunk!
                odd += tajArr[i]*3;
            else
                even += tajArr[i]*7;
        }
        const verificationNumber = (odd + even) % 10;

        if (tajArr[tajArr.length-1] === verificationNumber)
        {
            console.log('Sikeres hitelesítés!');
            error_msg2.classList.add('hidden');

            // ################### TAJ ELLENŐRZÉS VÉGE ###################



            // ################### ADÓAZONOSÍTÓ ELLENŐRZÉS ###################
            const taxArr = Array.from(String(taxNo), Number);

            let values = 1;
            let sumOfTaxNumber = 0;
            const num = 11;

            for (let i = 0; i < taxArr.length-1; i++)
            {
                sumOfTaxNumber += taxArr[i]*values;
                values++;
            }

            if (sumOfTaxNumber % num === taxArr[tajArr.length])
            {
                console.log("Jó az adószám is!");

                // gomb eltávolítása
                const button = document.getElementById('submit_button');
                button.remove();

                //adatok táblázatba foglalása
                const row = document.getElementById('insert_to_row');

                const cell1 = row.insertCell(0);
                cell1.innerHTML = clientName;

                const cell2 = row.insertCell(1);
                cell2.innerHTML = gender;

                const cell3 = row.insertCell(2);
                cell3.innerHTML = country;

                const cell4 = row.insertCell(3);
                cell4.innerHTML = state;

                const cell5 = row.insertCell(4);
                cell5.innerHTML = city;

                const cell6 = row.insertCell(5);
                cell6.innerHTML = birth;

                const cell7 = row.insertCell(6);
                cell7.innerHTML = result;

                const cell8 = row.insertCell(7);
                cell8.innerHTML = taxNo;

                const cell9 = row.insertCell(8);
                cell9.innerHTML = highestEducation;

                const cell10 = row.insertCell(9);
                cell10.innerHTML = email;

                const cell11 = row.insertCell(10);
                cell11.innerHTML = phone;

                // class kezelés
                const element = document.getElementById('table_div');
                element.classList.remove('hidden');

                error_msg1.classList.add('hidden');

            }
            else
            {
                console.log("Érvénytelen adószám!");
                error_msg1.classList.remove('hidden');
            }

            // ################### ADÓAZONOSÍTÓ ELLENŐRZÉS VÉGE ###################
        }
        else
        {
            console.log('Érvénytelen tajszám!');
            error_msg2.classList.remove('hidden');
        }
    });
};

