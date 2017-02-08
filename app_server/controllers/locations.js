/* GET 'home' page*/

'use strict';

module.exports.homelist = function(req, res) {
	res.render('locations-list', {
		title: 'Loc8r - Encontre um lugar para trabalhar com wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Encontre lugares com wifi perto de você'
		},
		sidebar: 'Procurando por Wifi? Loc8r ajuda você a encontrar lugares para trabalhar quando você não está em casa. Café, bolo ou bebidas? Deixe que Loc8r ajuda você a encontrar o lugar que você está procurando.',
		locations: [
			{
				name: 'Castelinho do Sorvete',
				adress: 'Av. Coronel João Gomes Martins, 456, Centro',
				rating: 3,
				facilities: ['Bebidas', 'Alimentação', 'Wifi Premium'],
				distance: '100m'
			},
			{
				name: 'Bar do Zé Carlos',
				adress: 'Av. Coronel João Gomes Martins, 254',
				rating: 5,
				facilities: ['Bebidas', 'Alimentação', 'Wifi Premium'],
				distance: '200m'
			},
			{
				name: 'Bar do Tio Pedro',
				adress: 'Av. Padre Jorge Summerer, 125',
				rating: 4,
				facilities: ['Bebidas', 'Alimentação', 'Wifi Premium'],
				distance: '250m'
			}
		]
	});
}

/* GET 'Location Info' page*/
module.exports.locationInfo = function(req, res) {
	res.render('locations-info', {
		title: 'Informações',
		name: 'Castelinho do Sorvete',
		adress: 'Av. Coronel João Gomes Martins, 456, Centro',
		rating: 3,
		facilities: ['Bebidas', 'Alimentação', 'Wifi Premium'],
		openingTimes: [
			{
				days: 'Segunda - Sexta',
				opening: '7:00am',
				closing: '7:00pm',
				closed: false
			},
			{
				days: 'Sábado',
				opening: '8:00am',
				closing: '5:00pm',
				closed: false
			},
			{
				days: 'Domingo',
				closed: true
			}
		],
		coords: {
			lat: -22.1490146,
			lng: -51.1715003
		},
		sidebar: {
			main: 'Starcups está em Loc8r porque tem internet acessível e espaço para se sentar com seu notebook e terminar algum trabalho.',
			comment: 'Se você foi e gostou - ou não - por favor deixe seu comentário para ajudar outras pessoas como você.'
		},
		reviews: [
			{
				author: 'Albanir Neves',
				rating: 5,
				timestamp: '25/09/2016',
				reviewText: 'Um lugar maravilhoso. Não tenho palavras para descrevê-lo!'
			},
			{
				author: 'Marlyn Neves',
				rating: 3,
				timestamp: '27/08/2016',
				reviewText: 'O café não estava tão bom, mas a internet é rápida.'
			}
		]

	});
}

/* GET 'Add review' page*/
module.exports.addReview = function(req, res) {
	res.render('locations-review-form', {
		title: 'Avaliação',
		name: 'Castelinho do Sorvete'
	});
}