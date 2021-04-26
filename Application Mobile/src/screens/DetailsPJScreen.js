import * as React from 'react';
import Web3 from 'web3';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ABIAppareil } from '../../abiAppareil';

export default class DetailsPJScreen extends React.Component 
{
  componentWillMount()
  {
    this.loadWeb3()
  }

  async loadWeb3() {
    
    //instanciation de Web3
    const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/4f7a55e037c7427f8d3b48d3899f10a4'));
    console.log("web3", web3);
    const network = await web3.eth.net.getNetworkType();
    console.log("network : ", network);

    //Instanciation du contract solidity
    const loadContract = new web3.eth.Contract(ABIAppareil, "0x18d4611ccD3675B24F18315ce9476952bBdc07eA");
    this.setState({ loadContract });

    //read data : number of PJ
    const Nb_Pj = await loadContract.methods.pjCount().call();
    this.setState({ Nb_Pj });
    console.log("Compteur : ",  Nb_Pj);

    const {route}=this.props;
    const {identifiant} =  route.params;
    this.setState({ identifiant });

    //Donnée de l'appareil
    const categorie = "Catégorie : " + await loadContract.methods.categorie().call();
    this.setState({ categorie });
    const a_type    = await loadContract.methods.a_type().call();
    this.setState({ a_type });
    const marque    = await loadContract.methods.brand().call();
    this.setState({ marque });
    const ref       = "Référence : " + await loadContract.methods.refer().call();
    this.setState({ ref });
    const nb_serie  = "Numéro de série : " + await loadContract.methods.serial_n().call();
    this.setState({ nb_serie });
    const statut    = await loadContract.methods.statut().call();
    this.setState({ statut });

    //Donnée de la pièce-jointe
    const donnee_PJ     = await loadContract.methods.dataPJ(identifiant).call(); 
    const document      = donnee_PJ.type_doc +  " du " + (new Date(donnee_PJ.date * 1000)).toLocaleString();
    this.setState({ document });
    const intervenant   = "Intervenant : " + donnee_PJ.intervenant;
    this.setState({ intervenant });
    const prix_total    = donnee_PJ.prix_tot += "€";
    this.setState({ prix_total });

    //Traitement du code du statut
    var statut_libel = "";
    switch(statut)
    {
        case "0":
            statut_libel = " de réparation";
            break;
        case "1":
            statut_libel = "de maintenance";
            break;
        default:
            statut_libel = "";
    }

    //Construction du libellé de la PJ
    const titre_pj = "Travaux " + statut_libel + " sur " + a_type + " " + marque;
    this.setState({ titre_pj });
    
    //Récupération de la liste des produits
    const productList_PJ = await loadContract.methods.getProductPJ(identifiant).call(); 
    console.log("liste des produits", productList_PJ);

    var productString = productList_PJ.toString(); //liste transformée en string
    var productTab = productString.split("],"); //transforme en array
    var table = new Array();
    for (var i=0; i<productTab.length; i++) //itére dans le tableau 
    {
        if (productTab[i].slice(-1) != "]") //rajouter crocher s'il y a plus
        {
            productTab[i] += "]";
        }
        var data = JSON.parse( productTab[i] ); //transforme les strings de l'array en array
        
        var qte =  parseFloat(data[2]);
        var prix = parseFloat(data[1]);
        var tot = qte * prix;
        table.push({
          produit: data[0],
          quantite: data[1],
          prix_unitaire: data[2] += "€",
          total: tot += "€"
        });
        console.log("Dans PJ : ", table);
    } 
    this.setState({tableData: table})
  }  

  constructor(props)
  {
    super(props)
    this.state = {
      account: '',
      Nb_Pj: 0,
      identifiant: '',
      categorie: '',
      a_type: '',
      marque: '',
      ref: '',
      nb_serie: '',
      statut: '',
      document: '',
      intervenant: '',
      prix_total: '',
      titre_pj: '',
      tableHead: ['Produit', 'Quantité', 'Prix unitaire', 'Total HT'],
      tableData: [],
      widthArr: [150, 65, 65, 65]
    }
  }

  render(){
    const tableData2 = this.state.tableData.map(record=>([record.produit, record.quantite, record.prix_unitaire, record.total]));

    return(
        <View style={{ flex: 1 }}>
                
                  <Text style={{marginLeft: 10, marginTop : 10, fontWeight: "bold"}}>{this.state.intervenant}</Text>
                  <Text style={{marginLeft: 10, marginTop : 10}}>{this.state.categorie}</Text>
                  <Text style={{marginLeft: 10, marginTop : 10}}>{this.state.ref}</Text>
                  <Text style={{marginLeft: 10, marginTop : 10}}>{this.state.nb_serie}</Text>
                  <Text style={{marginTop: 30, textAlign: 'center'}}>{this.state.document}</Text>
                  <Text style={{textAlign: 'center', marginBottom: 10, fontWeight: "bold"}}>{this.state.titre_pj}</Text>
                  <ScrollView horizontal={true}>
                    <View style={styles.container}>
                        <Table borderStyle={{borderWidth:  1, borderTopWidth: 0, borderColor: '#C1C0B9'}}>
                            <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.textHead}/>
                        </Table> 
                        <ScrollView>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            { 
                                tableData2.map((rowData, index) => (
                                    <Row key={index} data={rowData} widthArr={this.state.widthArr} textStyle={styles.text}/>      
                                )) 
                            }
                        </Table>
                        </ScrollView>
                    </View>
                  </ScrollView>
                  <Text style={{marginBottom: 50, textAlign: 'center', fontWeight: "bold", fontSize: 20, color:"red"}}>Total : {this.state.prix_total}</Text>
               
            </View>

    )
  }


}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, marginLeft : 15 },
    header: { height: 50, backgroundColor: '#000000'},
    textHead: { textAlign: 'center', fontWeight: '100', fontWeight: "bold", color:"white" },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1, borderWidth: 1, borderColor: '#C1C0B9'},
    row: { height: 40}
});


