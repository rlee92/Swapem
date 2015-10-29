'use strict';

var React = require('react-native');
var TableView = require('react-native-tableview')
var Section = TableView.Section;
var Item = TableView.Item;
var MyProfilesViewController2 = require('./MyProfilesViewController2')

var {
  StyleSheet,
  Component,
} = React;

var MyProfileTitles = [
{title: 'Basic'},
{title: 'School'},
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class MyProfilesViewController1 extends Component {
	render() {
		var profileTitle = MyProfileTitles[0];
		return (
			<TableView
			style = {styles.container}
			onPress = {(event) => this.showProfileDetails(profileTitle)}>
			<Section>
			<Item>{profileTitle.title}</Item>
			</Section>
			</TableView>
		);
	}
	showProfileDetails(profileTitle) {
		this.props.navigator.push({
			title: profileTitle.title,
			component: MyProfilesViewController2,
			backButtonTitle: ' ',
			rightButtonTitle: 'Edit',
		})
	}
}

module.exports = MyProfilesViewController1;
