class Form{
  // https://formdesigner.ru/news/maximum-size-and-type-of-uploaded-files.html

  static formOk=true;
  static size_limit=1024*1024*6 // 6Mb
  static errLs={
    name:{
      'nofill_EN':'Fill in the field!',
      'nofill_RU':'Заполните поле!',
      'length_EN':'Length up to 3-255',
      'length_RU':'Длина до 3-255',
      'text_EN':'Only such characters A-Za-zА-Яа-я',
      'text_RU':'Только такие символы A-Za-zА-Яа-я'
    },
    surname:{
      'nofill_EN':'Fill in the field!',
      'nofill_RU':'Заполните поле!',
      'length_EN':'Length up to 3-255',
      'length_RU':'Длина до 3-255',
      'text_EN':'Only such characters A-Za-zА-Яа-я',
      'text_RU':'Только такие символы A-Za-zА-Яа-я'
    },
    email:{
      'nofill_EN':'Fill in the field!',
      'nofill_RU':'Заполните поле!',
      'length_EN':'Length up to 3-255',
      'length_RU':'Длина до 3-255',
      'text_EN':'Only such characters A-Za-zА-Яа-я',
      'text_RU':'Только такие символы A-Za-zА-Яа-я'
    },
    title:{
      'nofill_EN':'Fill in the field!',
      'nofill_RU':'Заполните поле!',
      'length_EN':'Length up to 3-255',
      'length_RU':'Длина до 3-255',
      'text_EN':'Only such characters A-Za-zА-Яа-я',
      'text_RU':'Только такие символы A-Za-zА-Яа-я'
    },
    password:{
      'nofill_EN':'Fill in the field!',
      'nofill_RU':'Заполните поле!',
      'length_EN':'Length up to 6-255',
      'length_RU':'Длина до 6-255',
    },
    avatar:{
      'size_EN': 'Each file size is up to 6MB',
      'size_RU': 'Размер каждого файла до 6Мб',
      'format_EN': 'Acceptable formats png,jpg,jpeg,gif',
      'format_RU': 'Допустимые форматы png,jpg,jpeg,gif',
      'name_EN': 'Unacceptable symbols (+=[]:*?;«,.<>|\ )',
      'name_RU': 'Не допустимые символы (+=[]:*?;«,.<>|\ )',
    },
    files:{
      'size_EN': 'Each file size is up to 6MB',
      'size_RU': 'Размер каждого файла до 6Мб',
      'format_EN': 'Acceptable formats txt,pdf,png,jpg,jpeg,gif',
      'format_RU': 'Допустимые форматы txt,pdf,png,jpg,jpeg,gif',
      'name_EN': 'Unacceptable symbols (+=[]:*?;«,.<>|\ )',
      'name_RU': 'Не допустимые символы (+=[]:*?;«,.<>|\ )',
    },
    phone:{
      'nofill_EN':'Fill in the field!',
      'nofill_RU':'Заполните поле!',
      'length_EN': 'Total number length 12',
      'length_RU': 'Общая длина номера 12',
    }
  }

  // Размер файла
  // Входят данные только об одном файле
  static size_files(key,val){
    let defLs=Languages.ls['defaultL']

    if(this.size_limit<val.size){
      this.formOk=false
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['size_'+defLs]}`
      return false
    }else if(val.size<=0){
      this.formOk=false
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['size_'+defLs]}`
      return false
    }else{
      document.querySelector(`.err_${key}`).innerHTML=``
      return true;
    }
  }

  // Формат файла
  // Входят данные только об одном файле
  static type_files(key,val){
    let defLs=Languages.ls['defaultL']
    // 'text/plain -> txt'
    let formatFile=['text/plain', 'application/pdf', 'image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    
    if(formatFile.includes(val['type'])){
      document.querySelector(`.err_${key}`).innerHTML=``
      return true
    }else{
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['format_'+defLs]}`
      this.formOk=false
      return true;
    }
  }

  static type_files_avatar(key,val){
    let defLs=Languages.ls['defaultL']
    // 'text/plain -> txt'
    let formatFile=['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    if(formatFile.includes(val['type'])){
      document.querySelector(`.err_${key}`).innerHTML=``
      return true
    }else{
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['format_'+defLs]}`
      this.formOk=false
      return false;
    }
  }

  // проверяет текстовые поля
  static type_text(key,val){
    let defLs=Languages.ls['defaultL']
    val=val.replace(/><,.+=-/g,'\%')
    let regexp=/[0-9><,.+=-]?!@#$5%^&*()_+=-/gi;
    val=val.trim()
    val=val.replace(/><,.+=-?!@#$5%^&*()_[]}{/g,'a')
    
    if(val===''){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['nofill_'+defLs]}`
      this.formOk=false
      return false;
    }else if(regexp.test(val)){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['text_'+defLs]}`
      this.formOk=false
      return false;
    }else if(val.length<=2 && val.length>0){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['length_'+defLs]}`
      this.formOk=false
      return false;
    }else if(val.length>255){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['length_'+defLs]}`
      this.formOk=false
      return false;
    }else{
      document.querySelector(`.err_${key}`).innerHTML=''
      return true;
    }
  }

  // проверяет текстовые поля
  static type_password(key,val){
    let defLs=Languages.ls['defaultL']
    val=val.trim()
    val=val.replace(/><,.+=-/g,'\%')
    // console.log(val.replace(/><,.+=-?!@#$5%^&*()_[]}{/g,'a'))
    
    if(val===''){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['nofill_'+defLs]}`
      this.formOk=false
      return false;
    }else if(val<6 && val>0){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['length_'+defLs]}`
      this.formOk=false
      return false;
    }else if(val>255){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['length_'+defLs]}`
      this.formOk=false
      return false;
    }else{
      document.querySelector(`.err_${key}`).innerHTML=''
      return true;
    }
  }

  // проверяет текстовые поля
  static type_phone(key,val,codeLength){
    let defLs=Languages.ls['defaultL']
    
    if(val===''){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['nofill_'+defLs]}`
      this.formOk=false
      return false;
    }else if(val.length<codeLength && val.length>0){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['length_'+defLs]}`
      this.formOk=false
      return false;
    }else if(val.length>codeLength){
      document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['length_'+defLs]}`
      this.formOk=false
      return false;
    }else{
      document.querySelector(`.err_${key}`).innerHTML=''
      return true;
    }
  }
  
  static is_okInputs(form_id){
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    let form=new FormData(form_id)
    let defLs=Languages.ls['defaultL']
    this.formOk=true

    for (let [key,val] of form.entries()) {
      if(key==='files'){
        if(this.size_files(key,val)){
          if(this.type_files(key,val)){
            if(val['name'].match(/[+=[]:*?;«,.\<>|]/)){
              document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['name_'+defLs]}`
              this.formOk=false
            }else{
              document.querySelector(`.err_${key}`).innerHTML=``
            }
          }
        }
      }

        if(key==='avatar'){
          if(this.size_files(key,val)){
            if(this.type_files(key,val)){
              if(val['name'].match(/[+=[]:*?;«,.\<>|]/)){
                document.querySelector(`.err_${key}`).innerHTML=`${this.errLs[key]['name_'+defLs]}`
                this.formOk=false
              }else{
                document.querySelector(`.err_${key}`).innerHTML=``
              }
            }
          }
        }
        
      if(key==='name' || key==='surname' || key==='title' || key==='email'){
        this.type_text(key,val)
      }

      if(key==='password'){
        this.type_password(key,val)
      }

      if(key==='phone'){
        let arrCodeInfo=$(`#phones_code`).value.split('/')
        val=arrCodeInfo[0]+val
        this.type_phone(key,val,arrCodeInfo[1])
      }
    }
    return this.formOk;
  }

  // добавляет код страны в поле select
  static phone_code_select(phones_arr,elSelect){
    let str=''
    elSelect.innerHTML=''
    for(let i=1;i<phones_arr.length;i++){
      str+=`<option value="${phones_arr[i][3]}/${phones_arr[i][4]}">+${phones_arr[i][3]}</option>`
    }
    elSelect.innerHTML=str
  }
  
  
}
