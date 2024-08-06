class Dialog{
  // https://www.w3schools.com/jsref/met_dialog_close.asp
  
  static closeDialog(dialog_id){
    let dialog=document.querySelector(`${dialog_id}`)
    dialog.close();
  }
  
  static showDialog(dialog_id){
    let dialog=document.querySelector(`${dialog_id}`)
    dialog.show();
  }
}

/*
$(`#dialog_menu-close_x`).addEventListener('click',e=>
  Dialog.closeDialog(`#dialog_menu`)
)

$(`#header_burger`).addEventListener('click',e=>
  Dialog.showDialog(`#dialog_menu`)
)
*/
