

import van from 'van';

const { div, button, input, label, table, tbody, tr, td } = van.tags;

function SignIn(){


  const alias = van.state('');
  const passphrase = van.state('');

  function btnsign(){

  }
  
  return div(
    table(
      tbody(
        tr(
          td(
            label(' Alias: ')
          ),
          td(
            input({value:alias,oninput:e=>alias.val=e.target.value})
          ),
        ),
        tr(
          td(
            label(' Passphrase: ')
          ),
          td(
            input({value:passphrase,oninput:e=>passphrase.val=e.target.value})
          ),
        ),
        tr(
          td({colspan:"2"},
            button({onclick:btnsign},'Login'),
            button({onclick:btnsign},'Cancel')
          )
        ),
        
      )
    )
  )
}

export default SignIn;
