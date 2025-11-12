class Api {
  constructor({baseUrl,headers}) {
    this._baseUrl= baseUrl;
    this.headers= headers
    // corpo do construtor
  }
  _handleServerResponse(res){
    if (res.ok) {
        return res.json();
      }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,{
      headers:this.headers
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }
   getInitialData() {
  return Promise.all([this.getUsers(), this.getInitialCards()]);
 }

  //PATCH https://around-api.pt-br.tripleten-services.com/v1/users/me
   setUserData({name,about}){
     return fetch(`${this._baseUrl}/users/me`,{
      method:"PATCH",
      headers:this.headers,
      body:JSON.stringify({
        name,
        about
      })
    })
  }

  //GET https://around-api.pt-br.tripleten-services.com/v1/users/me
   getUsers(){
    return fetch(`${this._baseUrl}/users/me`,{
      headers:this.headers
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
   }

  }




 export const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "e0b41a55-bd02-4b93-a5a3-a9254a9ee601",
    "Content-Type": "application/json"
  }
});



