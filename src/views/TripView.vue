<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Store map in database</h1>
        <div>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <GMapMap v-if="location.destination.name !== ''" :zoom="11" ref="gMap"
                            :center="location.destination.geometry" style="width: 100%; height: 256px;">
                            <!-- <GMapMarker :position="location.destination.geometry" /> -->
                        </GMapMap>
                    </div>
                    <div class="mt-2">
                        <p class="text-xl">Going to <strong>{{ location.destination.address }}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useLocationStore } from '@/stores/location';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const location = useLocationStore();
const gMap = ref(null);
const router = useRouter();

onMounted(async () => {
    // does the user have a location set?
    if (location.destination.name === '') {
        router.push({
            name: 'location'
        })
    }

    // lets get the users current location
    await location.updateCurrentLocation()

    // draw a path on the map
    /* eslint-disable */
    gMap.value.$mapPromise.then((mapObject) => {
        let currentPoint = new google.maps.LatLng(location.current.geometry),
            destinationPoint = new google.maps.LatLng(location.destination.geometry),
            directionsService = new google.maps.DirectionsService,
            directionsDisplay = new google.maps.DirectionsRenderer({
                map: mapObject
            })

        directionsService.route({
            origin: currentPoint,
            destination: destinationPoint,
            avoidTolls: false,
            avoidHighways: false,
            travelMode: google.maps.TravelMode.DRIVING
        }, (res, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(res)
            } else {
                console.error(status)
            }
        })
    })
})
</script>