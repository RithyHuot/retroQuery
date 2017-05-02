$r('.addListItem').on('click', () => {
  let list = $r('ol');
  let input = $r('#listItem').elements[0].value;
  let counter = input.length;
  if ( input.length > 0 ) {
    list.append(`<li class='list-${counter}'>`+ input +'</li>');
    $r('#listItem').elements[0].value = '';
  }

  $r('li').on('click', () => {
    $r('li').toggleClass('strike');
  });

  $r('.removeListItem').on('click', () => {
    $r('li').remove();
  });
});
