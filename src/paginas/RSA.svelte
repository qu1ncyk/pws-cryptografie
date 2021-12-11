<script lang="ts">
    import Pagina from "../Pagina.svelte";
    import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
    import GenereerSleutelpaar from "./rsa/GenereerSleutelpaar.svelte";
    import Versleutel from "./rsa/Versleutel.svelte";
</script>

<svelte:head>
    <title>RSA - PWS Cryptografie</title>
</svelte:head>

<Pagina naam="RSA">
    <Tabs>
        <TabList>
            <Tab>Genereer sleutelpaar</Tab>
            <Tab>Versleutel/Ontsleutel</Tab>
        </TabList>

        <TabPanel>
            <GenereerSleutelpaar />
        </TabPanel>

        <TabPanel>
            <Versleutel />
        </TabPanel>
    </Tabs>
</Pagina>
