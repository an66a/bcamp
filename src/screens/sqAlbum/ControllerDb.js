import React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { userState } from '../../actions/userAction'
import { getPhotoByAlbumId } from '../../actions/dataAction'

const ControllerDb = ({ navigation }) => {
    
const dispatch = useDispatch()

const exeQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (err) => {
                    reject(err);
                });
        });
    });

const insertDb = async () => {
        let selectQuery = await exeQuery("SELECT * FROM album_list", []);
        var rows = selectQuery.rows;
        // console.log(rows);
        if (rows.length == 0) {
            let Data = this.props.AlbumList
            let query = "INSERT INTO album_list (id, title) VALUES";
            for (let i = 0; i < Data.length; ++i) {
                query = query + "('"
                    + Data[i].id
                    + "','"
                    + Data[i].title
                    + "')";
                if (i != Data.length - 1) {
                    query = query + ",";
                }
            }
            query = query + ";";
            let insertData = await exeQuery(query, []);
            console.log(insertData);
        }
    }
    const deleteDb = async (id) => {
        await exeQuery('DELETE FROM photo_list');
        // await this.ExecuteQuery('DELETE FROM album_list WHERE id = ?', [id]);
        console.log('SQL deleted');
        alert('Album SQL deleted')
    }
    return (

        <SafeAreaView style={styles.margin}>

            <View style={styles.margin}>
            <Button
            
            title="Delete SQL Data"
            onPress={() => deleteDb()}
        />
            </View>
            <View style={styles.margin}>

            <Button
                title="Insert SQL Data"
                onPress={() => insertDb()}
            />
            </View>
            <View style={styles.margin}>

            <Button
                title="Reload"
                onPress={() => dispatch(getPhotoByAlbumId(1))}
            />
            </View>
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    margin: {
        margin: 15,
    }
})
export default ControllerDb;