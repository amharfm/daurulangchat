
	var id_ = 0;
	function reset (){
		document.getElementById("cariin").value = "";
		document.getElementById("chats").innerHTML = "";
		document.getElementById("daftarnyah").innerHTML = "<i>Di sini dicantumkan percakapan/pertanyaan/jawaban yang pernah kami arsipkan</i>"
	}

	function toktak (obj){
		id_++;
		var table = document.createElement("table");
			table.id = "percakapan"+id_;
			table.setAttribute("class", "chat")
			table.border = 0;
			table.width = "95%";
			table.style.backgroundColor = "#FCFFD8"
		var cakaps = document.createElement("tr");
			cakaps.id = "cakap" + id_;
			// cakaps.id = "cakap" + obj.id;
			table.appendChild(cakaps);
		var cakaps_ = document.createElement("td");
			cakaps_.width = 100;
		var datetyme = document.createElement("div");
			datetyme.style.fontSize = '10px';
			datetyme.innerText = obj.dtm.slice(1, obj.dtm.length-1);
		var asker = document.createElement("div");
			asker.style.fontSize = '14px';
			if (obj.sndr[1]=="+"){
				asker.innerText = "Anonim "+(Math.floor(Math.random()*1000)).toString();
			} else asker.innerText = obj.sndr.slice(1, obj.sndr.length-1);
			cakaps_.appendChild(datetyme)
			cakaps_.appendChild(asker);
			cakaps.appendChild(cakaps_);
		var colon = document.createElement('td');
			colon.width = 1;
			colon.innerText = ":";
			cakaps.appendChild(colon);
		var quesyhon_c = document.createElement("div")
			quesyhon_c.setAttribute("class", "yours messages")
		var quesyhon = document.createElement('div');
			// quesyhon.style.fontSize = '16px';
			quesyhon.setAttribute('class', "message");
			quesyhon.innerText = obj.msg.slice(1);
			quesyhon_c.appendChild(quesyhon)
			cakaps.appendChild(document.createElement('td')).appendChild(quesyhon_c);

		document.getElementById("chats").appendChild(table);
		table.appendChild(cakaps)

		obj.ans.forEach(function(a){
			taktik(table, obj.id, a)
		})

		document.getElementById("chats").appendChild(document.createElement('br'));
	};

	function taktik(table, percId, z){
		var cakip = document.createElement('tr');
			// cakip.style.backgroundColor = "#fff"
			cakip.id = "cakip"+percId+"_"+z.id;
		var jawab = document.createElement('td');
			jawab.setAttribute("class", "mine messages")
		var jawaban = document.createElement('div')
			jawaban.style.fontSize = '17px';
			jawaban.setAttribute("class", "message last")
			if (z.message) jawaban.innerText = z.message.slice(1);
			if (jawaban.innerText.slice(-1)=='"') jawaban.innerText = jawaban.innerText.slice(0,jawaban.innerText.length-1)
		var penjawab = document.createElement('div');
			penjawab.style.fontSize = '13px';			
			if (z.sender.slice(1,2)=='+'){
				penjawab.innerText = "Anonim " + (Math.floor(Math.random()*1000)).toString();
			} else {
				penjawab.innerText = z.sender.slice(1, z.sender.length-1)
				// console.log(z.sender)
			}
		var datetymi = document.createElement('div');
			datetymi.style.fontSize = "10px";
			datetymi.innerText = z.datetime.slice(1, z.datetime.length-1);
		cakip.appendChild(document.createElement("td"))
		cakip.appendChild(document.createElement("td"))
		cakip.appendChild(jawab);
		jawab.appendChild(jawaban)
		jawab.appendChild(penjawab)
		jawab.appendChild(datetymi)
		table.appendChild(cakip);
	}		

	var db, dbig, dbig_baru, peta, petaIg;
	var jml_pertanyaan = 0;
	var hsl_saring = 0;
	var paraPertanyaan, paraPertanyaanIg;

	function bacadata(file,keperluan){
		// console.log(keperluan)
		switch (keperluan){
			case "csv":
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						db = csvJSON(this.responseText);
						paraPertanyaan = saring(db,peta);
						// console.table(db.length);

						// eksekusi(paraPertanyaan)
						// document.getElementById('cariin').value = "";
					 return db;
					}
				};
				xmlhttp.open("GET", file, true);
				xmlhttp.send();
				break;
			case "petaIg" :
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						petaIg = JSON.parse(this.responseText);
						okkurr("ig")
						
					 return petaIg;
					}
				};
				xmlhttp.open("GET", file, true);
				xmlhttp.send();
			break;
			case "peta" :
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						peta = JSON.parse(this.responseText);
						okkurr("csv")
						
					 return peta;
					}
				};
				xmlhttp.open("GET", file, true);
				xmlhttp.send();
			break;
			case "txt":
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						dbig = this.responseText;
						var wait = setInterval(function(){
							if (db.length<6267){ }
							else {
								clearInterval(wait)
								dbig_baru = kerjainIg(dbig, db);
								dbig_baru = saring(dbig_baru,petaIg, "ignih")
								db.pop(1);
								dbig_baru.forEach(function(d){
									paraPertanyaan.push(d);
								})
								awesum(pendek, paraPertanyaan);

								document.getElementById("jml").innerText = "Catatan: Dari " + db.length + " chat, sementara disaring menjadi " + paraPertanyaan.length + " pertanyajawaban";

								document.getElementById("cariin").focus()
								// console.log(paraPertanyaan)
							}
						},1000);
					 return dbig;
					}
				};
				xmlhttp.open("GET", file, true);
				xmlhttp.send();
			break;
		}	
	}

	function awesum(pendek, hasilsaring){		
		var aw_cari = new Awesomplete(document.getElementById("cariin"));
		aw_cari.list = pendek;
		document.getElementById("cariin").onchange = function(){
			this.value = "";
		}
		document.getElementById("cariin").addEventListener('awesomplete-selectcomplete', function(){
                var ini = document.getElementById("cariin").value;
                var hs_ = [];
				this.value = "";
                paraPertanyaan.forEach(function(hs){
                	if (hs.message.indexOf(ini.slice(0,5))>-1) 
                		eksekusi(hs, hs.id);
                })
            }
        )
	}
	var pendek = [];
	function saring(db,peta,ignih){
		var hasilsaring = []
		if (!ignih){
			peta.pertanyaannya.forEach(function(id){
				hasilsaring.push(db[id-5])
			})
			hasilsaring.forEach(function(h){
				h.answers = [];
				for (var c in peta.cakap){
					if (c==h.id){
						peta.cakap[c].forEach(function(j){
							h.answers.push(db[j-5])
						})
					}
				}
				pendek.push(h.message)
			})

		} else {
			peta.pertanyaannya.forEach(function(id){
				dbig_baru.forEach(function(d){
					if (d.id==id) {
						hasilsaring.push(d)
					}
				})
			})
			hasilsaring.forEach(function(h){
				h.answers = [];
				for (var c in peta.cakap){
					if (c==h.id){
						peta.cakap[c].forEach(function(j){
							dbig_baru.forEach(function(i){
								if (j==i.id) h.answers.push(i)
							})
						})
					}
				}

				pendek.push(h.message.slice(1, h.message.length-1))
			})
		}
	 return hasilsaring;
	}

	var IG = [];
	function kerjainIg(ig, db){
		var temp = [];
		var idnya = 0;
		var ig_ = ig.split("#");
		var id_ig = 0;
		var k = 1;
		ig_.forEach(function(j){
			j.split("\n").forEach(function(i){
				if (i.toLowerCase().slice(-3)==" am" || i.toLowerCase().slice(-3)==" pm"){
					if (i.indexOf(" profile picture")<0){
						temp[id_ig] = {
							"id" : id_ig + db.length + 1,
							"datetime" : '"' + i + '"'
						}
					}
					id_ig++;
				} else if (i.indexOf("profile picture")>-1){
					temp[id_ig-1].sender = '"'+"@"+i.split("'s ")[0] + '"';
				} else {
					if (i!="") {
						if (id_ig-1==temp.length-1){
							if (!temp[id_ig-1].message) temp[id_ig-1].message = "";
							temp[id_ig-1].message += i + '\n\n';
						}
					}
				}
				idnya++;
			})
	 		k++;
		})
		temp.forEach(function(t){
			if (!t.sender) t.sender = '"'+"Admin"+'"';
			t.message = '"' + t.message + '"';
		})
	 return temp;
	}

	function okkurr(apa){
		switch (apa){
			case 'ig':
				bacadata('instagramdm_2019oct27.txt', "txt")
				break;
			case 'ig_peta':
				bacadata('petaIg.json', "petaIg")
				break;
			case "csv":
				bacadata('chatppifi_csv2_demo.csv', "csv")
				break;
			default:
				bacadata("peta.json", "peta");
				okkurr("ig_peta");
				break;
		};
	}

	function eksekusi(res, nyariapa){
		if (!nyariapa){ //all
			document.getElementById("daftarnyah").innerHTML = "";
			for (var m=0; m<res.length; m++){
				toktak({
					id:res[m].id,
					dtm:res[m].datetime,
					sndr:res[m].sender,
					msg:res[m].message,
					ans:res[m].answers
				})
			}
		} else {
			document.getElementById("chats").innerHTML = "";
			document.getElementById("daftarnyah").innerHTML = "";

        	toktak({
        		id:res.id,
        		dtm:res.datetime,
        		sndr:res.sender,
        		msg:res.message,
        		ans:res.answers
        	});
		}
	}

	function csvJSON(csv){
		var lines=csv.split("\n");
		var result = [];
		var headers = [];
		lines[0].split(",").forEach(function(h){
			headers.push(h.slice(1,h.length-1));
		})

		for (var i=1; i<lines.length; i++){
			var datetime = lines[i].split(",")[1];
				datetime += ", ";
				datetime += lines[i].split(",")[2]
			var sender = lines[i].split(",")[3];
			var message = lines[i].split(",")[4];
			var idnya = lines[i].split(",")[0];
			result.push({
				"id" : Number(idnya),
				"datetime" : datetime,
				"sender" : sender,
				"message" : message
			})
		}
		return result; //JavaScript object
		// return JSON.stringify(result); //JSON
	}