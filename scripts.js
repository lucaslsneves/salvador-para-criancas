(() => {
  let alreadySeenInstagram = false;
  $("#cpf").mask("999.999.999-99");
  $("#telephone").mask("(99) 99999-9999");

  $(".my-insta-button").click(() => {
    alreadySeenInstagram = true;
  });
  function saveAs(uri, filename) {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  $("form").submit(function (event) {
    event.preventDefault();

    let cpf = $("#cpf").val();
    cpf = cpf.replace(/[\s.-]*/gim, "");

    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      $("#error").html("CPF Inválido");
      $("#error").show();
      return;
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) {
      $("#error").html("CPF Inválido");
      $("#error").show();

      return;
    }
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) {
      $("#error").html("CPF Inválido");
      $("#error").show();

      return;
    }

    $("#error").hide();

    if (!alreadySeenInstagram) {
      $("#error").html(
        'Antes de continuar, dê uma olhada em nosso instagram clicando no botão acima "Siga a gente no instagram".'
      );
      $("#error").show();
      return;
    }

    document.querySelector("button").innerHTML = "Carregando...";
    $("button").attr("disabled", true);
    $.ajax({
      type: "POST",
      url: "add-lead.php",
      data: {
        name: $("#name").val(),
        email: $("#email").val(),
        cpf: $("#cpf").val(),
        telephone: $("#telephone").val(),
      },
      dataType: "json",
    }).done(function (data) {
      document.querySelector("button").innerHTML = "Gerar Carteirinha";
      $("button").attr("disabled", false);
      if (!data?.success) {
        $("#error").html(data?.message);
        $("#error").show();
      } else {
        // $("content").addClass("no-opacity");
        // $("main").addClass("no-opacity");
        // $("#carteira-pronta").removeClass("disable");
        // $("#carteirinha").show();
        // $("#baixar").show();
        // $("#form").hide();

        $("body").html(`
        <img src="/assets/bg-amarelo.png" alt="Background" id="bg">
        <div class="overlay">
        <div id="carteira-pronta">
            <p>Carteirinha gerada com sucesso, <span style="color:#D53F8C">clique em baixar para efetuar o download</span></p>
            <img style="width: 50px" src="/assets/check.png" />
        </div>
            <div id="carteirinha">
            <div id="print">
                <img src="/assets/carteirinha.png">
                <div id="wrapper-nome-cpf">
                    <p id="nome-cartao">${$("#name").val()}</p>
                    <p id="cpf-cartao">${$("#cpf").val()}</p>
                </div>
                <p id="social">salvadorparacriancas</p>
            </div>
            <button id="baixar">Baixar</button>
            </div>
        </div>
        `);

        $("#baixar").click(() => {
          html2canvas(document.querySelector("#print")).then(function (canvas) {
            saveAs(canvas.toDataURL(), "carteirinha.png");
          });
        });
      }
    });
  });
})();
