'use strict';

var React = require('react-native');
var RemoteDataAccessManager = require('./../../RemoteDataAccessManager');
var SwapemVC2 = require('./SwapemVC2')
var SwapemVC3 = require('./SwapemVC3')

var {
	StyleSheet,
	Component,
	ListView,
	TouchableHighlight,
	View,
	Image,
	Text,
	AsyncStorage
} = React;

// TODO: Dynamically grab profile(s) information from local DB
var fakeProfiles = [
{Basic: {name: 'Ann Kim', phone: '(778) 111-1111', email: 'annkim@cs410.com', facebook: 'annkim'}},
{School: {name: 'Ann Kim', phone: '(778) 111-1111', facebook: 'annkim'}},
{Work: {name: 'Ann Kim', phone: '(778) 111-1111', email: 'annkim@cs410.com'}},
];

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

var styles = StyleSheet.create({
	cell: {
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10,
	},
	content: {
		flex: 1,
	},
	icon: {
		height: 40,
		marginLeft: 5,
		marginRight: 15,
		tintColor: '#3498DB',
		width: 40,
	},
	next: {
		alignSelf: 'flex-end',
		height: 20,
		marginLeft: 15,
		marginRight: 5,
		tintColor: '#E0E0E0',
		width: 20,
	},
	separator: {
		backgroundColor: '#E0E0E0',
		height: 0.5,
	},
	person: {
		fontSize: 20,
	},
});

class SwapemVC1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
		};
	}
	componentDidMount() {
		var profiles = fakeProfiles;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(profiles),
		});
	}
	render() {
		return (
			<ListView
			dataSource = {this.state.dataSource}
			renderRow = {this.renderContact.bind(this)}
			style = {styles.listView}/>
			);
	}
	renderContact(profile) {
		// e.g. profile = {Basic: {name: 'Ann Kim', phone: '(778) 111-1111', email: 'annkim@cs410.com', facebook: 'annkim'}}
		return (
			<TouchableHighlight
			onPress = {() => this.showProfileDetails(profile)}
			underlayColor = '#2980B9'>
			<View>
			<View style = {styles.cell}>
			<Image
			source = {require('image!Profile')}
			style = {styles.icon} />
			<View style = {styles.content}>
			<Text style = {styles.person}>{Object.keys(profile).toString()}</Text>
			</View>
			<View>
			<Image
			source = {require('image!Next')}
			style = {styles.next} />
			</View>
			</View>
			<View style = {styles.separator} />
			</View>
			</TouchableHighlight>
			);d
	}
	showProfileDetails(profile) {
		var profileType = Object.keys(profile).toString();
		var profileDetails = [
		{name: profile[profileType].name},
		{phone: profile[profileType].phone},
		{email: profile[profileType].email},
		{facebook: profile[profileType].facebook},
		];
		this.props.navigator.push({

			title: 'Customize',
			component: SwapemVC2,
			leftButtonIcon: require('image!Back'),
			onLeftButtonPress: () => {
				this.props.navigator.pop();
			},
			rightButtonTitle: 'Scan',
			onRightButtonPress: () => {
				RemoteDataAccessManager.prepareUserForScan(profile[profileType].name, function(usersNearby) {
					// Make sure that local temp storage is cleared
					AsyncStorage.removeItem('nearbyDevices').then((value) => {
				      console.log('nearbyDevices table cleared');
				      var jsonArray = [];

						for (var i = 0; i < usersNearby.length; i++) {
					         var user = usersNearby[i];
					         jsonArray.push({
									        name: user.get('name'),
									        uuid: user.get('uuid'),
									    	});
					         // user.get('name')
					         // user.get('uuid')
					         // Store in async storage here
					         //var fakeNearbyDevices = [
							 //		{name: 'Junoh Lee', uuid: '0000',},
							 // 	{name: 'Lisa Wong', uuid: '1111',},
							 //		{name: 'Ryan Lee', uuid: '2222',},
							 //	];
					       }
				       AsyncStorage.setItem('nearbyDevices', JSON.stringify(jsonArray));
				     });
				})
				this.showResults();
		    },
			passProps: {
				profileDetails: profileDetails,
			},
		})
	}
	showResults() {
		this.props.navigator.push({
			title: 'Nearby Devices',
			component: SwapemVC3,
			leftButtonIcon: require('image!Back'),
			onLeftButtonPress: () => {
				this.props.navigator.pop();
			},
			rightButtonTitle: 'Send',
		})
	}
}

module.exports = SwapemVC1;