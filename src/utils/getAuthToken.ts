// export function getCookie(name: string) {
//     if (typeof document === "undefined") return
  
//     const value = "; " + document.cookie
//     const decodedValue = decodeURIComponent(value)
//     const parts = decodedValue.split("; " + name + "=")
  
//     if (parts.length === 2) {
//       return parts.pop()?.split(";").shift()
//     }
// }

export function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }