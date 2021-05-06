import React from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';

const EthAddrConvertPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Substrate Address Converter</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Substrate Address Converter</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name={name} />
            </IonContent>
        </IonPage>
    );
};

export default EthAddrConvertPage;
