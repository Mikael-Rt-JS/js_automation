let $=ip=>document.querySelector(ip)

$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  if(Form.is_okInputs($('#form'))){
    $('#form').submit()
  }
})

window.onload=async e=>{
  Form.phone_code_select(phones_arr(),$(`#phones_code`))
}

