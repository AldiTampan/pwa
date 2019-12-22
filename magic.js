var listCounter = 0;

function tambah() {
	listCounter++;
	var temp = document.createElement('tr');
	temp.innerHTML = template.innerHTML.replace(/{NO}/g, listCounter);
	list.append(temp);
}

function hapus(element) {
	element.parentElement.parentElement.remove();
	process();
}

function process(no) {
	// === Pemesanan ===
	if (no) {
		// Menu, Item
		if (kasir['menu_' + no].value === 'mkn') {
			switch (kasir['item_' + no].value) {
				case 'nsgrg':
					kasir['harga_' + no].value = 12000;
					break;
				case 'nsgdg':
					kasir['harga_' + no].value = 13000;
					break;
				case 'miegrg':
					kasir['harga_' + no].value = 10000;
					break;
				case 'miegdg':
					kasir['harga_' + no].value = 11000;
					break;
				case 'cpjgrg':
					kasir['harga_' + no].value = 11000;
					break;
				case 'cpjgdg':
					kasir['harga_' + no].value = 12000;
					break;
				default:
					kasir['harga_' + no].value = 0;
					break;
			}
			window['itemMkn_' + no].disabled = false;
			window['itemMnm_' + no].disabled = true;
		} else {
			switch (kasir['item_' + no].value) {
				case 'teh':
					kasir['harga_' + no].value = 2000;
					break;
				case 'jeruk':
					kasir['harga_' + no].value = 2500;
					break;
				case 'kp':
					kasir['harga_' + no].value = 3000;
					break;
				default:
					kasir['harga_' + no].value = 0;
					break;
			}
			window['itemMkn_' + no].disabled = true;
			window['itemMnm_' + no].disabled = false;
		}
		kasir['jml_' + no].value = (parseInt(kasir['harga_' + no].value) * kasir['qty_' + no].value);


		// Qty
		if (kasir['qty_' + no].value === '' || kasir['qty_' + no].value === '0') {
			kasir['qty_' + no].value = '1';
		}
		// Jumlah
		kasir['jml_' + no].value = (parseInt(kasir['harga_' + no].value) * kasir['qty_' + no].value);
	}
	// === Pembayaran ===
	// Total
	var itemJml = document.getElementsByClassName('jml');
	kasir.total.value = 0;
	for (var i = 0; i < itemJml.length; i++) {
		kasir.total.value = parseInt(kasir.total.value) + parseInt(itemJml[i].value);
	}
	// Kembali
	if (kasir.bayar.value === '' || kasir.bayar.value === '0') {
		kasir.kembali.value = 0;
	} else {
		kasir.kembali.value = parseInt(kasir.bayar.value) - parseInt(kasir.total.value);
	}
}
// Nambah baris pertama
tambah(listCounter);
// Proses baris pertama
process(listCounter);

// offline
// Get the modal
var modal = document.getElementById("myModal");
window.addEventListener('load', function () {
	function updateOnlineStatus(event) {
		if (navigator.onLine) {
			modal.style.display = "none";
		} else {
			modal.style.display = "block";
		}
		// alert_offline.className = condition;
	}

	window.addEventListener('online', updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);
});