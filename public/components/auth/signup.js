

import van from 'van';

const { div, button, input, label, table, tbody, tr, td } = van.tags;

function SignUp(){

  const alias = van.state('');
  const passphrase1 = van.state('');
  const passphrase2 = van.state('');

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
            label(' Passphrase #1: ')
          ),
          td(
            input({value:passphrase1,oninput:e=>passphrase1.val=e.target.value})
          ),
        ),
        tr(
          td(
            label(' Passphrase #2: ')
          ),
          td(
            input({value:passphrase2,oninput:e=>passphrase2.val=e.target.value})
          ),
        ),
        tr(
          td({colspan:"2"},
            button({onclick:btnsign},'Register'),
            button({onclick:btnsign},'Cancel')
          )
        ),
        
      )
    )
  )

}

export default SignUp;
