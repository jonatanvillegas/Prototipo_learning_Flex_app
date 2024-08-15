import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import courses from '../../Data/CursosData'

export default function CardCurso() {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {courses.map((course, index) => (
                <View key={index} style={styles.courseCard}>
                    <Image source={course.imageUrl} style={styles.image} />
                   
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    courseCard: {
        width: 250,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    level: {
        fontSize: 12,
        color: '#666',
    },
});