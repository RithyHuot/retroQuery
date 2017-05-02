document.addEventListener('DOMContentLoaded', () => {
  const button = $r('button');
  $r('.addListItem').on('click', () => {
    let list = $r('ol');
    let input = $r('#listItem').elements[0].value;
    if ( input.length > 0 ) {
      list.append(
        `<li>`+
        input +
        "<button class='removeButton'>X</button>" +
        '</li>');

        $r('#listItem').elements[0].value = '';

        $r(".removeButton").on('click', (e) => {
          $r(e.currentTarget).parent().remove();
        });

        $r('li').on('click', (e) => {
          $r(e.currentTarget).toggleClass('strike');
        });
    }

    $r('.removeListItem').on('click', () => {
      $r('li').remove();
    });
  });
});
