import api from "~/config/axios";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getMonth() + 1).padStart(2, '0');
    const month = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function createData(name, dob, fullName, startDate, email, phoneNumber, status) {
    return { name, dob, fullName, startDate, email, phoneNumber, status }
}

const rows = [
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspended'),
    createData('Genevieve U. Watts', '01/01/2000', 'Eget Incorporated', '07/18/2017', 'Nullam.vitae@egestas.edu', '0800 025698', 'Closed'),
    createData('Kyra S. Baldwin', '01/01/2000', 'Lorem Vitae Limited', '04/14/2016', 'in@elita.org', '0800 237 8846', 'Suspended'),
    createData('Stephen V. Hill', '01/01/2000', 'Eget Mollis Institute', '03/03/2016', 'eu@vel.com', '0800 682 4591', 'Active'),
    createData('Vielka Q. Chapman', '01/01/2000', 'Eu Ltd', '06/25/2017', 'orci.Donec.nibh@mauriseratget.edu', '0800 181 5795', 'Suspended'),
    createData('Ocean W. Curtis', '01/01/2000', 'Eu Ltd', '08/24/2017', 'cursus.et@cursus.edu', '(016977) 9585', 'Active'),
    createData('Kato F. Tucker', '01/01/2000', 'Vel Lectus Limited', '11/06/2017', 'Duis@Lorem.edu', '070 0981 8503', 'Active'),
    createData('Robin J. Wise', '01/01/2000', 'Curabitur Dictum PC', '02/09/2017', 'blandit@montesnascetur.edu', '0800 259158', 'Active'),
    createData('Uriel H. Guerrero', '01/01/2000', 'Mauris Inc.', '02/11/2018', 'vitae@linnecorci.net', '0500 948772', 'Active'),
    createData('Yasir W. Benson', '01/01/2000', 'At Incorporated', '01/13/2017', 'ornare.elit.elit@atortor.edu', '0391 916 3600', 'Active')
  ]
function setAccountData(data){
    return createData(
        data.lastName,
        formatDate(data.dob)    ,
        data.firstName + ' '+ data.lastName,
        formatDate(data.createAt),
        data.email,
        data.phone,
        data.status ? 'Suspended' : 'Active'
    )
}

export default class StaffApi {
    static async getAccounts(page, unitPerPage, role) {
        const response = await api.get('/accounts', {
            params: {page, unitPerPage, role}
        });

        const customerData = response.data.data.map((data) => {
            return setAccountData(data);
        })

        return customerData;
    }

    static async searchAccountsByFullName(page, unitPerPage, role, searchValue) {
        const response = await api.get('/accounts/search-by-name/'+searchValue, {
            params: {page, unitPerPage, role}
        });

        const customerData = response.data.data.map((data) => {
            return setAccountData(data);
        })

        return customerData;
    }
}