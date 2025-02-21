export const getUserId=()=>{
    const {data}=JSON.parse(localStorage.getItem('userdata'));
    const {id}=data
    console.log(id);
    return id;
}