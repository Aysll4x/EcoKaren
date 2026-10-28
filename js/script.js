document.addEventListener('DOMContentLoaded', () => {
  // Menu hambúrguer em telas menores.
  const botaoMenu = document.querySelector('.menu-toggle');
  const menuPrincipal = document.getElementById('menu-principal');
  if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener('click', () => {
      const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
      botaoMenu.setAttribute('aria-expanded', String(!aberto));
      menuPrincipal.classList.toggle('menu-aberto', !aberto);
      const rotulo = botaoMenu.querySelector('.sr-only');
      if (rotulo) rotulo.textContent = aberto ? 'Abrir menu' : 'Fechar menu';
    });
    menuPrincipal.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      botaoMenu.setAttribute('aria-expanded', 'false');
      menuPrincipal.classList.remove('menu-aberto');
      const rotulo = botaoMenu.querySelector('.sr-only');
      if (rotulo) rotulo.textContent = 'Abrir menu';
    }));
  }

  // Marca o item ativo do menu principal.
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.menu a').forEach(link => {
    const ativo = link.getAttribute('href') === paginaAtual;
    link.classList.toggle('ativo', ativo);
    if (ativo) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  // Gabinetes de computador analisados (página Equipamentos).
  const gradePCs = document.getElementById('pcs');
  const filtroStatus = document.getElementById('fs');
  const contador = document.getElementById('count');
  if (!gradePCs) return;
  const gabinetes = [
    {id:'PC01', status:'Parcialmente funcional', resumo:'Foram verificados fonte e conexões. A equipe trocou bateria CMOS e cabos SATA e testou um SSD. Persistiram problemas no reconhecimento do armazenamento, com suspeita de falha em porta SATA da placa-mãe.'},
    {id:'PC02', status:'Inservível', resumo:'O gabinete apresentava componentes ausentes, falha no botão de energia e fonte considerada sem condições de uso.'},
    {id:'PC03', status:'Funcional', resumo:'Após conectar o cabo do cooler, reconectar os cabos do HD e substituir a bateria CMOS, o equipamento apresentou funcionamento. O HD foi removido durante o processo registrado.'},
    {id:'PC04', status:'Inservível', resumo:'O registro de diagnóstico apontou ausência de processador e de módulos de memória nos slots.'},
    {id:'PC05', status:'Inservível', resumo:'Foram instalados processador, dissipador e módulos de memória provenientes do PC01 para teste. Mesmo após as verificações, o equipamento não ligou; havia suspeita relacionada ao cabo do botão de energia.'},
    {id:'PC06', status:'Funcional', resumo:'O gabinete voltou a funcionar após a substituição da bateria CMOS. A unidade de disquete foi desativada.'},
    {id:'PC07', status:'Funcional', resumo:'O funcionamento foi restabelecido após a substituição da bateria CMOS.'},
    {id:'PC08', status:'Inservível', resumo:'O registro de diagnóstico apontou ausência de processador e de slots de memória RAM.'},
    {id:'PC09', status:'Funcional', resumo:'O equipamento foi colocado em funcionamento após receber processador, dissipador e quatro módulos de memória provenientes do PC05.'},
    {id:'PC10', status:'Inservível', resumo:'Foram testados fonte, botão de energia e cooler; também houve limpeza interna e aplicação de pasta térmica. A presença do processador ainda precisava ser confirmada no registro consultado.'}
  ];
  const classeStatus = status => status === 'Funcional' ? 'status-funcional' : status === 'Parcialmente funcional' ? 'status-parcial' : 'status-inservivel';
  function renderizarPCs() {
    const escolhidos = gabinetes.filter(pc => !filtroStatus?.value || pc.status === filtroStatus.value);
    gradePCs.innerHTML = escolhidos.map(pc => `<article class="card pc-card"><img class="pc-foto" src="img/${pc.id.toLowerCase()}.jpg" alt="Ficha do gabinete ${pc.id.slice(2)}" onerror="this.remove()"><div class="pc-cabecalho"><span class="pc-id">${pc.id}</span><span class="pc-status ${classeStatus(pc.status)}">${pc.status}</span></div><h3>Gabinete ${pc.id.slice(2)}</h3><p>${pc.resumo}</p><span class="pc-nota">Diagnóstico registrado pela equipe do projeto.</span></article>`).join('');
    if (contador) contador.textContent = `${escolhidos.length} de ${gabinetes.length} gabinetes exibidos`;
  }
  filtroStatus?.addEventListener('change', renderizarPCs);
  renderizarPCs();
});
